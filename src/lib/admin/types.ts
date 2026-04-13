export type AdminResourceKey =
  | "campaigns"
  | "users"
  | "who"
  | "site-settings"
  | "products"
  | "services"
  | "blog-posts"
  | "contact-appointments";

export type AdminInputFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "number"
  | "datetime-local"
  | "select"
  | "checkbox";

export type AdminOption = {
  label: string;
  value: string;
};

export type AdminFieldBase = {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type AdminInputField = AdminFieldBase & {
  type: AdminInputFieldType;
  min?: number;
  step?: number;
  options?: AdminOption[];
};

export type AdminRepeaterField = AdminFieldBase & {
  type: "repeater";
  itemLabel: string;
  fields: AdminInputField[];
  defaultItem: Record<string, unknown>;
};

export type AdminField = AdminInputField | AdminRepeaterField;

export type AdminSection = {
  title: string;
  description?: string;
  fields: AdminField[];
};

export type AdminColumnType =
  | "text"
  | "boolean"
  | "date"
  | "money"
  | "count";

export type AdminColumn = {
  key: string;
  label: string;
  type?: AdminColumnType;
  placeholder?: string;
  currencyKey?: string;
  trueLabel?: string;
  falseLabel?: string;
};

export type AdminResourceDefinition = {
  key: AdminResourceKey;
  title: string;
  singular: string;
  description: string;
  href: string;
  apiPath: string;
  emptyState: string;
  createLabel: string;
  singleton?: boolean;
  columns: AdminColumn[];
  formSections: AdminSection[];
  defaultValues: Record<string, unknown>;
};
