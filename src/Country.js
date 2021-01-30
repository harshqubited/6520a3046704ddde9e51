import React from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Button,
  Spinner,
  Thumbnail,
} from 'native-base';
import {SvgUri} from 'react-native-svg';
import {Dimensions, StyleSheet} from 'react-native';
import image from '../images/weather.jpg';

const Country = ({route, navigation}) => {
  const country = route.params.countryName;
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let query = 'https://restcountries.eu/rest/v2/name/' + country;
    console.log(query);
    fetch(query)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status === 404) {
          setError('Country Not found');
        } else {
          setData(json);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  }, [country]);

  const searchWeather = () => {
    navigation.navigate('Capital', {
      capital: data[0].capital,
    });
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Spinner />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

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

  return (
    <Container>
      <Thumbnail source={image} square style={styles.background} />
      <Content>
        {data && (
          <Card style={styles.card}>
            <CardItem bordered style={styles.flag}>
              <SvgUri
                style={styles.center}
                height="100%"
                width="40%"
                uri={data[0].flag}
              />
            </CardItem>
            <CardItem bordered>
              <Text>Capital: </Text>
              <Text>{data[0].capital}</Text>
            </CardItem>
            <CardItem bordered>
              <Text>Population: </Text>
              <Text>{data[0].population}</Text>
            </CardItem>
            <CardItem bordered>
              <Text>latlng: </Text>
              <Text>{data[0].latlng}</Text>
            </CardItem>
            <CardItem style={styles.center}>
              <Button onPress={searchWeather} rounded>
                <Text>Capital Weather</Text>
              </Button>
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {justifyContent: 'center'},
  flag: {
    height: '40%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  background: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  card: {
    marginTop: '25%',
    paddingVertical: '40%',
    height: '100%',
  },
});

export default Country;
