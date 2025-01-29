declare module "ngrok" {
  interface NgrokOptions {
    addr: number | string;
    region?: string;
    authtoken?: string;
    subdomain?: string;
    host_header?: string;
  }

  interface NgrokModule {
    connect(options: NgrokOptions): Promise<string>;
    disconnect(url?: string): Promise<void>;
    kill(): Promise<void>;
  }

  const ngrok: NgrokModule;
  export default ngrok;
}
