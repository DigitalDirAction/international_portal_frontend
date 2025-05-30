import { Box } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ResponsiveCarousel from '../../../components/TopBanner/TopBanner'
import RecentApplicationRequests from '../../../components/RecentApplicationRequests/RecentApplicationRequests';


const AdminDashboard = () => (
  <Box sx={{ p: 2, mt: 10}}>
    <ResponsiveCarousel />
    <RecentApplicationRequests />
  </Box>
);
export default AdminDashboard;