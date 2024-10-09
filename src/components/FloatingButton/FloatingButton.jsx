import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pen from '../../assets/icon/pen.svg';
import My from '../../assets/icon/phimg.svg'; // Ensure you import your default image

export default function FloatingButton() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [profileImage, setProfileImage] = useState(My); // Default image if none is fetched
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem("key");
            if (!accessToken) {
                setError('Authentication required');
                return;
            }
            try {
                const response = await axios.get('https://maeummal.com/user', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                if (response.data.isSuccess) {
                    setUserInfo(response.data.data);
                    setProfileImage(response.data.data.profileImage || My);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user info: ' + error.message);
            }
        };
        fetchUserInfo();
    }, []);

    const handleFloatingButtonClick = () => {
        // Navigate based on the presence of the 'iq' field
        if (userInfo.pinCode != null) {
            navigate('/selfstudy'); // For students
        } else {
            navigate('/createlesson'); // For teachers
        }
    };

    return (
        <a onClick={handleFloatingButtonClick} href="#">
            <img
                src={Pen}
                alt="Edit"
                width="60" 
                height="60"
                style={{ position: 'fixed', right: 25, bottom: 25, cursor: 'pointer' }}
            />
        </a>
    );
}
