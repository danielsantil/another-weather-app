/** API response model */
export class WeatherModel {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: MainInfo;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  /** Time of data calculation, unix, UTC */
  dt: number;
  sys: System;
  /** Shift in seconds from UTC */
  timezone: number;
  /** City id */
  id: number;
  name: string;
  rain: Rain;
  snow: Snow;
}

/**
 * It is possible to meet more than one weather condition for a requested location.
 * The first weather condition in API respond is primary.
 */
export class WeatherCondition {
  /** Weather condition id */
  id: number;
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  main: string;
  description: string;
  /** Weather icon id */
  icon: string;
}

export class MainInfo {
  /** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
  temp: number;
  feels_like: number;
  /** Atmospheric pressure */
  pressure: number;
  /** Humidity, % */
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export class Wind {
  /** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
  speed: number;
  /** Wind direction, degrees (meteorological) */
  deg: number;
}

export class Clouds {
  /** Cloudiness, % */
  all: number;
}

export class System {
  /** Country code (GB, JP etc.) */
  country: string;
  /** Time in unix, UTC */
  sunrise: number;
  /** Time in unix, UTC */
  sunset: number;
}

export class Coordinates {
  lon: number;
  lat: number;
}

export class Rain {
  '1h': number;
}

export class Snow {
  '1h': number;
}

export enum Unit {
  K = 'standard',
  C = 'metric',
  F = 'imperial'
}

export class WeatherUnit {
  static readonly K = new WeatherUnit(Unit.K, 'K');
  static readonly C = new WeatherUnit(Unit.C, '°C');
  static readonly F = new WeatherUnit(Unit.F, '°F');

  private constructor(public readonly value: Unit, public readonly label: string) { }

  static from(unit: Unit): WeatherUnit {
    const type = Object.keys(this).find(key => this[key].value === unit);
    return this[type];
  }

  static asList(): WeatherUnit[] {
    const list = Object.keys(this).map(k => this[k]);
    return list;
  }
}

