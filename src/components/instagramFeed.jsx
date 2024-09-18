/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Instagram } from 'lucide-react';
import imagicaProfile from '../assets/imagicaProfile.png'

// Importa los estilos CSS de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function InstagramCarousel({ accessToken }) {
  const [posts, setPosts] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${accessToken}`);
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    const fetchProfileInfo = async () => {
        try {
          const response = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${accessToken}`);
          response.data.profile_picture_url = imagicaProfile
          setProfileInfo(response.data);
        } catch (error) {
          console.error('Error fetching profile info:', error);
        }
      };

    // fetchProfileInfo()
    fetchPosts();
  }, []);

  const settings = {
    dots: true,
    rtl: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  const defaultCaption = "Sorprende, inspira y diviértete. Tus fotos, como nunca las imaginaste. 😜📲"

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
        {/* <h2 className="text-2xl font-bold">Estamos en Insta</h2> */}
        {/* {profileInfo && (
          <a
            href={`https://www.instagram.com/${profileInfo.username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {profileInfo.profile_picture_url ? (
              <img
                src={profileInfo.profile_picture_url}
                alt={profileInfo.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <span className="text-sm font-medium">{profileInfo.username}</span>
          </a>
        )} */}
      </div>
      <Slider {...settings} className="instagram-carousel">
        {posts.map((post) => (
          <div key={post.id} className="px-2">
            {/* Add h-[400px] */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[360px]">
              <div className="h-64 overflow-hidden bg-slate-800">
                {post.media_type === 'IMAGE' ? (
                  <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  <img src={post.media_url} alt={post.caption} className="w-full h-full object-contain" style={{ aspectRatio: '3/4'}}/>
                </a>
                ) : post.media_type === 'VIDEO' ? (
                  <video src={post.media_url} className="w-full h-full object-cover" controls />
                ) : (
                  <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  <img src={post.thumbnail_url} alt={post.caption} className="w-full h-full object-contain" />
                </a>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">{post.caption ?? defaultCaption}</p>
                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-2 inline-block text-blue-500 hover:underline"
                >
                  Ver en Instagram
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}