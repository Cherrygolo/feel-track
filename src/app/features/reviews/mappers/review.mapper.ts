import { ApiReviewStats } from "../models/dto/api-review-stats.dto";
import { ReviewStats } from "../models/review.model";

/**
 * File containing functions mappings API responses linked to reviews
 */

export function mapReviewStats(api: ApiReviewStats): ReviewStats {
  const POSITIVE = api.positive ?? 0;
  const NEUTRAL = api.neutral ?? 0;
  const NEGATIVE = api.negative ?? 0;

  return {
    POSITIVE,
    NEUTRAL,
    NEGATIVE,
    ALL: POSITIVE + NEUTRAL + NEGATIVE
  };
}