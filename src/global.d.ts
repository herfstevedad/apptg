interface Window {
    tgWebApp?: {
      initData: {
        user: {
          id: number;
          first_name: string;
          username: string;
        };
        query_id: string;
      };
      onEvent(event: string, callback: () => void): void;
      offEvent(event: string, callback: () => void): void;
      ready(): void;
    };
  }