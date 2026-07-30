// shared/hooks/usePageTitle.ts
import { useEffect } from "react";

export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `TaskFlow | ${title}`;
  }, [title]);
}
