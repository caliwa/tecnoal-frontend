export interface Nft {
  id: number;
  title: string;
  last_bid?: number;
  price: number;
  autor?: string;
  avatar?: string;
  instant_price?: number;
  ending_in?: string;
  image: string;
}
