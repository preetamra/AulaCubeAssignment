import React,{ 
  useEffect,
  useState,
 } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

async function fetchComments(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const resJson = await res.json();
    return resJson;   
  }catch(error) {
    console.log(error);
    return [];
  }
}

function App(): React.JSX.Element {
  const [data, setDate] = useState([]);
  const [comments,setComments] = useState([])
  const [postId,setPostId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then((res) => {
     return res.json();
    }).then((data) => {
      const tempData = data.map((item,index) => {
        return {
          label: item.title,
          value: item.body,
          id:item.id
        }
      })
      setDate(tempData);
    }).catch((error) => {
      console.log(error);
      setDate([]);
    })
  },[]);

  useEffect(() => {
    if(!postId) return;
    fetchComments(postId).then((res) => {
      setComments(res);
    })
   },[postId]);

  return (
    <SafeAreaView style={styles.container}>
      <Dropdown 
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      style={{
        width:"100%"
      }}
      onChange={ async(val) => {
        setPostId(val?.id);
      }}
      ></Dropdown>
      {
        !comments.length && <View style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
        }}>
          <Text>Please Select an item from the DropDown Menu</Text>
        </View>
      }
      <ScrollView>
      {comments?.map((item,index) => {
          return(
            <View style={{
              width:"95%",
              height:"auto",
              marginTop:10,
              backgroundColor:"#f1f1f1",
              borderRadius:10,
              padding:10,
              justifyContent:"space-between",
              alignItems:"center",
              alignSelf:"center",
              marginBottom:10,
            }}>
              <Text style={
              {
                fontSize:16,
                fontWeight:'500',
                marginTop:10,
              }
            }>
                {item.name}
              </Text>
              <Text style={
              {
                fontSize:14,
                //fontWeight:'bold',
                marginTop:10,
              }
            }>
                {item.email}
              </Text>
            <Text 
            style={
              {
                fontSize:18,
                fontWeight:'bold',
                marginTop:10,
              }
            } 
            key={index}>
              {item.body}
            </Text>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
   }
});

export default App;
