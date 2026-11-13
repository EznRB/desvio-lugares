import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEmptyData, parseData, type AppData } from "./domain";
import { places } from "./data/places";
const key = "desvio:v1";
const Context = createContext<{
  data: AppData;
  ready: boolean;
  error: string;
  update: (fn: (data: AppData) => AppData) => Promise<void>;
} | null>(null);
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(createEmptyData);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const current = useRef(data);
  const writable = useRef(false);
  const queue = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(key)
      .then((raw) => {
        const saved = parseData(
          raw,
          places.map((p) => p.id),
        );
        if (active) {
          current.current = saved;
          setData(saved);
          writable.current = true;
          setReady(true);
        }
      })
      .catch(() => {
        if (active)
          setError(
            "Não foi possível ler seus dados locais. Eles foram preservados. Reabra o aplicativo para tentar novamente.",
          );
      });
    return () => {
      active = false;
    };
  }, []);
  const update = (fn: (value: AppData) => AppData) => {
    const operation = queue.current.then(async () => {
      if (!writable.current)
        throw new Error("Aguarde o carregamento dos dados locais.");
      const next = parseData(
        JSON.stringify(fn(current.current)),
        places.map((p) => p.id),
      );
      await AsyncStorage.setItem(key, JSON.stringify(next));
      current.current = next;
      setData(next);
    });
    queue.current = operation.catch(() => {});
    return operation;
  };
  return (
    <Context.Provider value={{ data, ready, error, update }}>
      {children}
    </Context.Provider>
  );
}
export function useData() {
  const value = useContext(Context);
  if (!value) throw new Error("Dados indisponíveis.");
  return value;
}
