// SmsBatchCard.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {MegaphoneIcon, CameraIcon} from 'react-native-heroicons/outline';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

export default function Camera() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleImagePick = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      if (!asset?.uri) return;

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          name: 'contact-list.jpg',
          type: asset.type || 'image/jpeg',
        });

        const res = await axios.post(
          'https://bonsmsextractapi002-5.onrender.com/ocr/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('OCR API Response:', res.data);

        const cleaned = (res.data.extracted_phone_numbers || []).filter(
          num => num && num.trim() !== '',
        );

        setContacts(cleaned);
      } catch (err) {
        console.error(err);
        Alert.alert('Upload Failed', err.message);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <TouchableOpacity
      className="bg-background-card rounded-md p-5 mx-4 mt-4 items-center"
      onPress={handleImagePick}>
      {/* Title Row */}
      <View className="flex-row items-center mb-4">
        <MegaphoneIcon size={20} color="#F97316" />
        <Text className="text-secondary-dark font-semibold text-base ml-2">
          Start Your Next SMS Batch
        </Text>
      </View>

      {/* Camera Icon / Loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#F97316" />
      ) : (
        <CameraIcon size={64} color="#F97316" />
      )}

      {/* Subtitle */}
      <Text className="text-secondary-light mt-4 text-sm">
        Upload Contact List Image
      </Text>

      {/* Extracted Contacts */}
      {contacts.length > 0 && (
        <View className="mt-4 w-full">
          <Text className="font-semibold mb-2">Extracted Contacts:</Text>
          {contacts.map((c, i) => (
            <Text key={i} className="text-black">
              {c}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}
