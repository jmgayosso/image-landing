/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

// Importa los estilos CSS de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function InstagramCarousel({ accessToken }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${accessToken}`);
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings} className="instagram-carousel">
        {posts.map((post) => (
          <div key={post.id} className="px-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col">
              <div className="h-64 overflow-hidden">
                {post.media_type === 'IMAGE' ? (
                  <img src={post.media_url} alt={post.caption} className="w-full h-full object-cover" style={{ aspectRatio: '3/4'}}/>
                ) : post.media_type === 'VIDEO' ? (
                  <video src={post.media_url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={post.thumbnail_url} alt={post.caption} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <p className="text-sm text-gray-600 line-clamp-3">{post.caption}</p>
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