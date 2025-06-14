/**
 * Utility functions for handling score ranges and conversions
 */

export interface ScoreRange {
  min: number;
  max: number;
  representative: number;
}

/**
 * Define score ranges with their representative values
 */
const SCORE_RANGES: ScoreRange[] = [
  { min: 1.0, max: 1.9, representative: 1.5 },
  { min: 2.0, max: 2.9, representative: 2.5 },
  { min: 3.0, max: 3.9, representative: 3.5 },
  { min: 4.0, max: 4.9, representative: 4.5 },
  { min: 5.0, max: 5.9, representative: 5.5 },
  { min: 6.0, max: 6.9, representative: 6.5 },
  { min: 7.0, max: 7.9, representative: 7.5 },
  { min: 8.0, max: 8.9, representative: 8.5 },
  { min: 9.0, max: 9.9, representative: 9.5 },
  { min: 10.0, max: 10.0, representative: 10.0 }
];

/**
 * Convert a numerical score to its corresponding range string
 * @param score - The numerical score (1-10)
 * @returns The score range string (e.g., "3.0-3.9")
 */
export const getScoreRangeString = (score: number): string => {
  const range = SCORE_RANGES.find(r => score >= r.min && score <= r.max);
  
  if (!range) {
    // Fallback for edge cases
    if (score < 1) return "1.0-1.9";
    if (score > 10) return "10.0-10.0";
    
    // Find the closest range
    const roundedScore = Math.round(score);
    const fallbackRange = SCORE_RANGES.find(r => roundedScore >= r.min && roundedScore <= r.max);
    if (fallbackRange) {
      return fallbackRange.max === fallbackRange.min 
        ? `${fallbackRange.min.toFixed(1)}-${fallbackRange.max.toFixed(1)}`
        : `${fallbackRange.min.toFixed(1)}-${fallbackRange.max.toFixed(1)}`;
    }
  }
  
  return range!.max === range!.min 
    ? `${range!.min.toFixed(1)}-${range!.max.toFixed(1)}`
    : `${range!.min.toFixed(1)}-${range!.max.toFixed(1)}`;
};

/**
 * Parse a score range string and return the representative numerical score
 * @param scoreRange - The score range string (e.g., "3.0-3.9")
 * @returns The representative numerical score for that range (e.g., 3.5)
 */
export const parseScoreRangeString = (scoreRange: string): number => {
  const range = SCORE_RANGES.find(r => {
    const rangeString = r.max === r.min 
      ? `${r.min.toFixed(1)}-${r.max.toFixed(1)}`
      : `${r.min.toFixed(1)}-${r.max.toFixed(1)}`;
    return rangeString === scoreRange;
  });
  
  if (!range) {
    // Try to parse the range string manually as fallback
    const parts = scoreRange.split('-');
    if (parts.length === 2) {
      const min = parseFloat(parts[0]);
      const max = parseFloat(parts[1]);
      if (!isNaN(min) && !isNaN(max)) {
        return min === max ? min : (min + max) / 2;
      }
    }
    
    // Ultimate fallback
    return 5.0;
  }
  
  return range.representative;
};

/**
 * Get all available score ranges for navigation/linking purposes
 * @returns Array of score range strings
 */
export const getAllScoreRanges = (): string[] => {
  return SCORE_RANGES.map(range => 
    range.max === range.min 
      ? `${range.min.toFixed(1)}-${range.max.toFixed(1)}`
      : `${range.min.toFixed(1)}-${range.max.toFixed(1)}`
  );
};

/**
 * Validate if a score range string is valid
 * @param scoreRange - The score range string to validate
 * @returns True if valid, false otherwise
 */
export const isValidScoreRange = (scoreRange: string): boolean => {
  return getAllScoreRanges().includes(scoreRange);
};