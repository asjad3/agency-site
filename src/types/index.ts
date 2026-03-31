export interface NavItem {
  label: string;
  href: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: "primary" | "secondary" | "tertiary";
  codeSnippet?: string;
  visual?: React.ReactNode;
}

export interface TechNode {
  id: string;
  label: string;
  title: string;
  icon: string;
  position: {
    top: string;
    left: string;
  };
  accent: "primary" | "secondary" | "tertiary";
}

export interface ProcessPhase {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  accent: "primary" | "secondary" | "tertiary";
  status?: string;
}

export interface InfrastructureModule {
  id: string;
  title: string;
  description: string;
  icon?: string;
  accent: "primary" | "secondary" | "tertiary";
  size: "small" | "large";
  tags?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
