import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import {FileObject} from '@supabase/storage-js'
import Ionicons from '@expo/vector-icons/Ionicons'

//expo packages importation
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import supabase from '@/DBconfig/supabaseClient'

//reusable components
import ImageItem from '@/components/imageItem'



const List = () => {

    const {user } = useAuth()
    const [files, setFiles] = useState<FileObject[]>([])

    //function for loading the images
    const loadImages = async () => {
        const { data } = await supabase.storage.from('files').list(user?.id)
        if (data) setFiles(data)

    }

    //function to eelect images from the internal media files
    const onSelectImage = async () => {
        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        }
        const results = await ImagePicker.launchImageLibraryAsync(options);

        //uploading the uri to the supabase storage
        if(!results.canceled){
            const img = results.assets[0]// obtaining the uri
            const base64 = await FileSystem.readAsStringAsync(img.uri, {encoding: 'base64'})//encoding the uri
            const filepath = `${user?.id}/${new Date().getTime()}.${img.type == 'image' ? 'png' : 'jpg'}`//generating a filepath similar to the one on supabase storage
            const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';//specifying the content types that will be uploaded
            await supabase.storage.from('files').upload(filepath, decodeURI(base64), {contentType})
            await loadImages()//updating the images on screen after uploading 
        }
    }

    //use effect for loadinng the images on the screen
    useEffect(() => {
        if(!user) return;

        loadImages()
    }, [user])
    

    const onRemoveImage = async (item: FileObject, listIndex: number) => {
        supabase.storage.from('files').remove([`${user!.id}/${item.name}`]);
        const newFiles = [...files];
        newFiles.splice(listIndex, 1);
        setFiles(newFiles);
      };


  return (

    <View style={styles.container}>

        <ScrollView>
            {files.map((item, index) => (
                <ImageItem key={item.id} item={item} userId={user!.id} onRemoveImage={() => onRemoveImage(item, index)} />
            ))}
        </ScrollView>


        <TouchableOpacity onPress={onSelectImage} style={styles.fab}>
            <Ionicons name="camera-outline" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#151515',
    },
    fab: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      position: 'absolute',
      bottom: 40,
      right: 30,
      height: 70,
      backgroundColor: '#2b825b',
      borderRadius: 100,
    },
  });