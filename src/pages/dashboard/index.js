import { useEffect, useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import StartupDataGrid from './StartupDataGrid';
import InvestorDataGrid from './InvestorDataGrid';
import BlogDataGrid from './BlogDataGrid';
import NewsDataGrid from './NewsDataGrid';
import SubscriptionData from './SubscriptionData';
import CampaignDataTable from './CampaignDataTable';
import Contact from './Contact';
import Chart from './Chart';
// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {

    const [investorList, setInvestorList] = useState([]);
    const [startupList, setStartupList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const [subscriptionList, setSubscriptionList] = useState([]);


    const fetchStartupData = async () => {
        const res= await fetch('http://localhost:5000/startup/getall');
        const data = await res.json();
        console.log(data.result.filter(obj => obj.role === 'startup'));
        setStartupList(data.result.filter(obj => obj.role === 'startup'));
    };

    const fetchBlogData = async () => {
        const res = await fetch('http://localhost:5000/Blog/getall');
        const data = await res.json();
        console.log(data);
        setBlogList(data.result);
    };

    const fetchNewsData = async () => {
        const res = await fetch('http://localhost:5000/News/getall');
        const data = await res.json();
        console.log(data);
        setNewsList(data.result);
    };

    const fetchInvestorData = async () => {
        const res= await fetch('http://localhost:5000/startup/getall');
        const data = await res.json();
        console.log(data.result.filter(obj => obj.role === 'investor'));
        setInvestorList(data.result.filter(obj => obj.role === 'investor'));
        };
    

     const fetchSubscriptionData = async () => {
            const res= await fetch('http://localhost:5000/Subscription/getall');
            const data = await res.json();
            console.log(data);
            setSubscriptionList(data.result);
    };
        
    const fetchCampaignData = async () => {
        const res= await fetch('http://localhost:5000/campaign/getall');
        const data = await res.json();
        console.log(data);
        setCampaignList(data.result);
};      

    useEffect(() => {
        fetchStartupData();
        fetchInvestorData();
        fetchBlogData();
        fetchNewsData();
        fetchCampaignData(); 
        fetchSubscriptionData();
    }, []);


    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Page Views" count="416" percentage={59.3} extra="00" />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Startups" count={startupList.length} percentage={27.4} isLoss color="warning" extra="00" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Investors" count={investorList.length} percentage={27.4}  extra="00" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Blog" count={blogList.length} percentage={70.5} isLoss color="warning"extra="00" />
            </Grid>
           
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total News" count={newsList.length} percentage={70.5} extra="00" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Campaigns" count={campaignList.length} percentage={70.5} isLoss color="warning"extra="00" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Subscriptions" count={subscriptionList.length} percentage={70.5} extra="00" />
            </Grid>


            <div style={{width:"100%",padding:"20px"}}>
           
           <Grid container alignItems="center" justifyContent="space-between">
               <Grid item>
                     <Typography variant="h5">Charts</Typography>

               </Grid>
               <Grid item />
           </Grid>
           <MainCard sx={{ mt: 2 }} content={false} style={{display:"flex",justifyContent:"center"}}>
           <Chart/>

           </MainCard>
      
       </div>
    

            {/* row 3 */}
            <div style={{width:"100%",padding:"20px"}}>
           
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">News DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <NewsDataGrid/>
                </MainCard>
           
            </div>
         
            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Blog DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                <BlogDataGrid/>
                </MainCard>
            </div>

            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Campaign DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                <CampaignDataTable/>
                </MainCard>
            </div>

            
            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Startup DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
              
                <StartupDataGrid/>

                </MainCard>
            </div>
           
            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Investor DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                <InvestorDataGrid/>
                </MainCard>
            </div>

            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Subscription DataTable</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <SubscriptionData/>
                </MainCard>
            </div>

            <div style={{width:"100%",padding:"20px"}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Contact Data</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Contact/>
                </MainCard>
            </div>

        </Grid>
    );
};

export default DashboardDefault;
