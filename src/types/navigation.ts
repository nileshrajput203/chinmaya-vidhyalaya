export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
  isExternal?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TopBarInfo {
  announcement?: string;
  phone: string;
  email: string;
  affiliationNo: string;
  udiseNo: string;
}
