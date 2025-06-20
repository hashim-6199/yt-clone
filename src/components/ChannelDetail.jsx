import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos from './Videos';
import ChannelCard from './ChannelCard';

import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  
  const [channelDetail, setChannelDetail] = useState();
  
  const [videos, setVideos] = useState(null);

  const { id } = useParams();



  useEffect(() => {
    
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);
  


  return (

    <Box minHeight="95vh">
      <Box>

        <div style={{
          height:'300px',
          
          background: 'linear-gradient(90deg, rgb(159, 196, 114) 0%, rgb(178, 114, 171) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        
        }} />
        
        
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      
      </Box>
      <Box p={2} display="flex">

      <Box sx={{ mr: { sm: '100px' } }}/>

        <Videos videos={videos} />


      </Box>

    </Box>

  );
};


export default ChannelDetail;
