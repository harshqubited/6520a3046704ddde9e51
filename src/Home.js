import React from 'react';
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Button,
  Thumbnail,
  Card,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import image from '../images/weather.jpg';

const Home = ({navigation}) => {
  const [country, setCountry] = React.useState('');
  const onChangeCountry = (value) => {
    setCountry(value);
  };

  const search = () => {
    navigation.navigate('Country', {
      countryName: country,
    });
    setCountry('');
  };

  return (
    <Container>
      <Thumbnail source={image} square style={styles.background} />
      <Content>
        <Card style={styles.card}>
          <Form>
            <Item>
              <Input
                value={country}
                onChangeText={onChangeCountry}
                placeholder="Enter Country"
              />
            </Item>
            <Button
              disabled={!country}
              onPress={search}
              style={styles.btn}
              rounded>
              <Text>Search</Text>
            </Button>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  background: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  card: {
    marginTop: '25%',
    paddingVertical: '10%',
  },
});

export default Home;
