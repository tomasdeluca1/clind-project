import { PRODUCTS } from "./products";

export interface CursorRule {
  id: string;
  name: string;
  description: string;
  tier: "free" | "basic" | "pro" | "team";
  maxTasks?: number;
  features: string[];
}

export const CURSOR_RULES: Record<string, CursorRule> = {
  FREE: {
    id: "free",
    name: "Free Tier",
    description: "Basic task management",
    tier: "free",
    maxTasks: 10,
    features: [
      "basic_dashboard",
      "task_creation",
      "task_completion",
      "basic_themes", // Only basic themes allowed
    ],
  },
  BASIC: {
    id: "basic",
    name: PRODUCTS.BASIC.name,
    description: PRODUCTS.BASIC.description,
    tier: "basic",
    maxTasks: 25,
    features: [
      "basic_dashboard",
      "limited_reports",
      "data_export",
      "basic_analytics",
      "priority_tasks",
      "custom_themes",
      "three_rule_method",
    ],
  },
  PRO: {
    id: "pro",
    name: PRODUCTS.PRO.name,
    description: PRODUCTS.PRO.description,
    tier: "pro",
    features: [
      "basic_dashboard",
      "unlimited_tasks",
      "advanced_analytics",
      "priority_support",
      "one_three_five_rule",
      "priority_reminders",
      "weekly_summaries",
    ],
  },
  TEAM: {
    id: "team",
    name: PRODUCTS.TEAM.name,
    description: PRODUCTS.TEAM.description,
    tier: "team",
    features: [
      "basic_dashboard",
      "unlimited_tasks",
      "advanced_analytics",
      "priority_support",
      "team_collaboration",
      "custom_workflows",
      "api_access",
      "dedicated_support",
    ],
  },
};

export function getUserTierFromProduct(productName: string): string {
  switch (productName) {
    case PRODUCTS.BASIC.name:
      return "basic";
    case PRODUCTS.PRO.name:
      return "pro";
    case PRODUCTS.TEAM.name:
      return "team";
    default:
      return "free";
  }
}

export function getFeaturesByTier(tier: string): string[] {
  const cursorRule = Object.values(CURSOR_RULES).find(
    (rule) => rule.tier === tier
  );
  return cursorRule?.features || CURSOR_RULES.FREE.features;
}

export function hasFeatureAccess(tier: string, feature: string): boolean {
  const features = getFeaturesByTier(tier);
  return features.includes(feature);
}
