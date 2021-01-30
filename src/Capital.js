import React from 'react';
import {
  Container,
  Content,
  Card,
  Text,
  CardItem,
  Spinner,
  Right,
  Left,
  Thumbnail,
  Button,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import image from '../images/weather.jpg';

const Capital = ({route, navigation}) => {
  const capital = route.params.capital;
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let query =
      'http://api.weatherstack.com/current?access_key=089794494947d7348d0e866c8f9dd4d7&query=' +
      capital;
    fetch(query)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(JSON.stringify(e, null, 2));
        setLoading(false);
      });
  }, [capital]);

  if (error) {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Text>{error}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Thumbnail source={image} square style={styles.background} />
      <Content>
        {data && (
          <Card style={styles.card}>
            <CardItem>
              <Right>
                {data.current.weather_icons.map((item, index) => (
                  <Thumbnail
                    square
                    small
                    source={{uri: item}}
                    key={index.toString()}
                  />
                ))}
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>Temperature</Text>
              </Left>
              <Right>
                <Text>{data.current.temperature}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>Wind Speed</Text>
              </Left>
              <Right>
                <Text>{data.current.wind_speed}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Text>Precipitation</Text>
              </Left>
              <Right>
                <Text>{data.current.precip}</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.center} bordered>
              <Button rounded onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
              </Button>
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {alignSelf: 'center'},
  background: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  card: {
    marginTop: '25%',
    paddingVertical: '20%',
  },
});

export default Capital;
