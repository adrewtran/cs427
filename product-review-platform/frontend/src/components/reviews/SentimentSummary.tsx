import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSentimentStats } from '../../redux/slices/reviewSlice';
import type { RootState } from '../../redux/store';
import { Box, Typography, LinearProgress, Paper, Chip } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface SentimentSummaryProps {
  productId: number;
}

const SentimentSummary = ({ productId }: SentimentSummaryProps) => {
  const dispatch = useAppDispatch();
  const { sentimentStats, sentimentLoading } = useAppSelector((state: RootState) => state.review);
  const { reviews } = useAppSelector((state: RootState) => state.review);

  useEffect(() => {
    dispatch(fetchSentimentStats(productId));
  }, [dispatch, productId]);

  if (sentimentLoading) {
    return <LinearProgress />;
  }

  if (!sentimentStats || reviews.length === 0) {
    return null;
  }

  const { positive, negative, neutral, averageScore } = sentimentStats;
  const totalReviews = positive + negative + neutral;
  
  const positivePercent = Math.round((positive / totalReviews) * 100) || 0;
  const neutralPercent = Math.round((neutral / totalReviews) * 100) || 0;
  const negativePercent = Math.round((negative / totalReviews) * 100) || 0;

  const getSentimentColor = (score: number) => {
    if (score > 0.5) return '#4CAF50';
    if (score > 0) return '#8BC34A';
    if (score === 0) return '#9E9E9E';
    if (score > -0.5) return '#FF9800';
    return '#F44336';
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Review Sentiment
      </Typography>
      
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip 
          icon={<SentimentSatisfiedAltIcon />} 
          label={`Positive: ${positive} (${positivePercent}%)`} 
          color="success" 
          size="small"
          variant="outlined"
        />
        <Chip 
          icon={<SentimentNeutralIcon />} 
          label={`Neutral: ${neutral} (${neutralPercent}%)`} 
          color="default" 
          size="small"
          variant="outlined"
        />
        <Chip 
          icon={<SentimentVeryDissatisfiedIcon />} 
          label={`Negative: ${negative} (${negativePercent}%)`} 
          color="error" 
          size="small"
          variant="outlined"
        />
      </Box>
      
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" gutterBottom>
          Overall Sentiment Score: 
          <Box component="span" sx={{ 
            fontWeight: 'bold', 
            color: getSentimentColor(averageScore),
            ml: 1
          }}>
            {averageScore.toFixed(2)}
          </Box>
        </Typography>
      </Box>
      
      <Box sx={{ width: '100%', display: 'flex', mb: 1 }}>
        <Box sx={{ 
          width: `${positivePercent}%`, 
          height: 8, 
          bgcolor: '#4CAF50',
          borderTopLeftRadius: positivePercent > 0 ? 4 : 0,
          borderBottomLeftRadius: positivePercent > 0 ? 4 : 0,
          borderTopRightRadius: neutralPercent === 0 && negativePercent === 0 ? 4 : 0,
          borderBottomRightRadius: neutralPercent === 0 && negativePercent === 0 ? 4 : 0,
        }} />
        <Box sx={{ 
          width: `${neutralPercent}%`, 
          height: 8, 
          bgcolor: '#9E9E9E',
          borderRadius: positive === 0 && negative === 0 ? 4 : 0,
        }} />
        <Box sx={{ 
          width: `${negativePercent}%`, 
          height: 8, 
          bgcolor: '#F44336',
          borderTopRightRadius: negativePercent > 0 ? 4 : 0,
          borderBottomRightRadius: negativePercent > 0 ? 4 : 0,
          borderTopLeftRadius: positivePercent === 0 && neutralPercent === 0 ? 4 : 0,
          borderBottomLeftRadius: positivePercent === 0 && neutralPercent === 0 ? 4 : 0,
        }} />
      </Box>
    </Paper>
  );
};

export default SentimentSummary; 