import { Box } from '@mui/material';
import RecentApplications from '../../../components/RecentApplications/RecentApplications'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ResponsiveCarousel from '../../../components/TopBanner/TopBanner'


const Dashboard = () => (
  <Box sx={{ p: 2, mt: 10}}>
    <ResponsiveCarousel />
    <RecentApplications />
  </Box>
);
export default Dashboard;