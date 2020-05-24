export type selectType = {
  latitude: number
  longitude: number
  title: string
  description: string
} | null


export interface GeocoderResponseMetaData {
  request: string
  results: string
  found: string
}

export interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData
}

export interface Component {
  kind: string
  name: string
}

export interface Address {
  country_code: string
  formatted: string
  postal_code: string
  Components: Component[]
}

export interface PostalCode {
  PostalCodeNumber: string
}

export interface Premise {
  PremiseNumber: string
  PostalCode: PostalCode
}

export interface Thoroughfare {
  ThoroughfareName: string
  Premise: Premise
}

export interface Locality {
  LocalityName: string
  Thoroughfare: Thoroughfare
}

export interface PostalCode2 {
  PostalCodeNumber: string
}

export interface Premise2 {
  PremiseNumber: string
  PostalCode: PostalCode2
}

export interface Thoroughfare2 {
  ThoroughfareName: string
  Premise: Premise2
}

export interface Locality2 {
  LocalityName: string
  Thoroughfare: Thoroughfare2
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string
  Locality: Locality2
}

export interface AdministrativeArea {
  AdministrativeAreaName: string
  Locality: Locality
  SubAdministrativeArea: SubAdministrativeArea
}

export interface Country {
  AddressLine: string
  CountryNameCode: string
  CountryName: string
  AdministrativeArea: AdministrativeArea
}

export interface AddressDetails {
  Country: Country
}

export interface GeocoderMetaData {
  precision: string
  text: string
  kind: string
  Address: Address
  AddressDetails: AddressDetails
}

export interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData
}

export interface Envelope {
  lowerCorner: string
  upperCorner: string
}

export interface BoundedBy {
  Envelope: Envelope
}

export interface Point {
  pos: string
}

export interface GeoObject {
  metaDataProperty: MetaDataProperty2
  name: string
  description: string
  boundedBy: BoundedBy
  Point: Point
}

export interface FeatureMember {
  GeoObject: GeoObject
}

export interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty
  featureMember: FeatureMember[]
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection
}

export interface RootObject {
  response?: Response
}
