import { useSubscription } from "@/components/guards/RouteGuard";
import {
  hasFeatureAccess,
  getUserTierFromProduct,
  CursorRule,
  CURSOR_RULES,
} from "@/config/cursor-rules";

export function useFeatures() {
  const { subscriptionTier } = useSubscription();

  const canUseFeature = (feature: string): boolean => {
    if (!subscriptionTier) return false;
    const tier = getUserTierFromProduct(subscriptionTier);
    return hasFeatureAccess(tier, feature);
  };

  const getCurrentTier = (): CursorRule | null => {
    if (!subscriptionTier) return CURSOR_RULES.FREE;
    const tier = getUserTierFromProduct(subscriptionTier);
    return (
      Object.values(CURSOR_RULES).find((rule) => rule.tier === tier) ||
      CURSOR_RULES.FREE
    );
  };

  const getMaxTasks = (): number => {
    const currentTier = getCurrentTier();
    return currentTier?.maxTasks || CURSOR_RULES.FREE.maxTasks || 0;
  };

  return {
    canUseFeature,
    getCurrentTier,
    getMaxTasks,
    currentTier: getCurrentTier(),
  };
}
