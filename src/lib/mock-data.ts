import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import a1 from "@/assets/artisan-1.jpg";
import a2 from "@/assets/artisan-2.jpg";
import a3 from "@/assets/artisan-3.jpg";

export const PRODUCT_IMAGES = [p1, p2, p3, p4, p5, p6];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  stock: number;
  rating: number;
  reviews: number;
  artisan: string;
  region: string;
  description: string;
  tags: string[];
  status: "live" | "pending" | "draft";
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Heritage Blue Pottery Vase",
    price: 1299,
    image: p1,
    category: "Home Decor",
    material: "Ceramic",
    stock: 24,
    rating: 4.8,
    reviews: 142,
    artisan: "Lakshmi Devi",
    region: "Jaipur, Rajasthan",
    description:
      "Hand-thrown by third-generation artisans of Jaipur, this 10-inch vase carries the cobalt blue that made the city famous on the Silk Route. Each piece is unique — fired in traditional wood kilns and painted free-hand with mineral pigments.",
    tags: ["handmade", "jaipur", "blue-pottery", "home-decor"],
    status: "live",
  },
  {
    id: "p2",
    name: "Festive Diya Set (Pack of 3)",
    price: 449,
    image: p2,
    category: "Festive",
    material: "Terracotta",
    stock: 86,
    rating: 4.9,
    reviews: 308,
    artisan: "Priya Ranjan",
    region: "Khurja, UP",
    description: "Hand-painted clay diyas with traditional rangoli motifs. Perfect for Diwali, weddings and pujas.",
    tags: ["diya", "diwali", "festive", "terracotta"],
    status: "live",
  },
  {
    id: "p3",
    name: "Banarasi Silk Saree — Ruby",
    price: 7899,
    image: p3,
    category: "Textiles",
    material: "Silk",
    stock: 7,
    rating: 4.9,
    reviews: 96,
    artisan: "Manoj Patel",
    region: "Varanasi, UP",
    description: "Pure Banarasi silk with hand-woven zari work. Six yards of generational craft.",
    tags: ["saree", "banarasi", "silk", "wedding"],
    status: "live",
  },
  {
    id: "p4",
    name: "Brass Temple Bell",
    price: 899,
    image: p4,
    category: "Spiritual",
    material: "Brass",
    stock: 42,
    rating: 4.7,
    reviews: 51,
    artisan: "Ravi Sharma",
    region: "Moradabad, UP",
    description: "Solid brass bell with hand-engraved sacred patterns. Resonant, warm tone.",
    tags: ["brass", "puja", "bell", "spiritual"],
    status: "live",
  },
  {
    id: "p5",
    name: "Sandalwood Ganesha — 6 inch",
    price: 2499,
    image: p5,
    category: "Spiritual",
    material: "Sandalwood",
    stock: 12,
    rating: 5.0,
    reviews: 33,
    artisan: "Anand Kumar",
    region: "Mysore, Karnataka",
    description: "Hand-carved from a single block of fragrant Mysore sandalwood.",
    tags: ["ganesha", "sandalwood", "carved"],
    status: "pending",
  },
  {
    id: "p6",
    name: "Madhubani Painting — Fish & Lotus",
    price: 3299,
    image: p6,
    category: "Art",
    material: "Canvas",
    stock: 4,
    rating: 4.9,
    reviews: 18,
    artisan: "Sita Jha",
    region: "Madhubani, Bihar",
    description: "Traditional Mithila folk art painted with natural pigments on handmade canvas.",
    tags: ["madhubani", "painting", "folk-art", "mithila"],
    status: "live",
  },
];

export const CATEGORIES = [
  { name: "Home Decor", emoji: "🏺", count: 1248 },
  { name: "Textiles", emoji: "🧣", count: 962 },
  { name: "Festive", emoji: "🪔", count: 631 },
  { name: "Spiritual", emoji: "🔔", count: 478 },
  { name: "Art", emoji: "🎨", count: 295 },
  { name: "Jewelry", emoji: "💍", count: 387 },
];

export interface Order {
  id: string;
  product: string;
  buyer: string;
  amount: number;
  status: "placed" | "packed" | "shipped" | "delivered" | "cancelled";
  date: string;
  image: string;
}

export const ORDERS: Order[] = [
  { id: "KM-9341", product: "Heritage Blue Pottery Vase", buyer: "Aarav Mehta", amount: 1299, status: "shipped", date: "Jun 09", image: p1 },
  { id: "KM-9340", product: "Festive Diya Set (Pack of 3)", buyer: "Neha Iyer", amount: 449, status: "delivered", date: "Jun 08", image: p2 },
  { id: "KM-9339", product: "Banarasi Silk Saree — Ruby", buyer: "Riya Kapoor", amount: 7899, status: "packed", date: "Jun 08", image: p3 },
  { id: "KM-9338", product: "Brass Temple Bell", buyer: "Vikram Singh", amount: 899, status: "delivered", date: "Jun 07", image: p4 },
  { id: "KM-9337", product: "Madhubani Painting", buyer: "Ananya Gupta", amount: 3299, status: "placed", date: "Jun 07", image: p6 },
  { id: "KM-9336", product: "Festive Diya Set", buyer: "Rohan Das", amount: 449, status: "delivered", date: "Jun 06", image: p2 },
];

export interface Seller {
  id: string;
  name: string;
  region: string;
  avatar: string;
  products: number;
  revenue: number;
  status: "active" | "pending" | "suspended";
  joined: string;
}

export const SELLERS: Seller[] = [
  { id: "s1", name: "Lakshmi Devi", region: "Jaipur, Rajasthan", avatar: a1, products: 18, revenue: 142800, status: "active", joined: "Mar 2025" },
  { id: "s2", name: "Manoj Patel", region: "Varanasi, UP", avatar: a2, products: 32, revenue: 386200, status: "active", joined: "Jan 2025" },
  { id: "s3", name: "Priya Ranjan", region: "Khurja, UP", avatar: a3, products: 24, revenue: 89400, status: "active", joined: "Apr 2025" },
  { id: "s4", name: "Anand Kumar", region: "Mysore, Karnataka", avatar: a1, products: 12, revenue: 64500, status: "pending", joined: "Jun 2026" },
  { id: "s5", name: "Sita Jha", region: "Madhubani, Bihar", avatar: a3, products: 9, revenue: 41200, status: "active", joined: "May 2026" },
  { id: "s6", name: "Ravi Sharma", region: "Moradabad, UP", avatar: a2, products: 28, revenue: 132100, status: "suspended", joined: "Feb 2025" },
];

export const REVENUE_SERIES = [
  { month: "Jan", revenue: 218000, orders: 1240 },
  { month: "Feb", revenue: 264000, orders: 1410 },
  { month: "Mar", revenue: 312000, orders: 1670 },
  { month: "Apr", revenue: 298000, orders: 1605 },
  { month: "May", revenue: 386000, orders: 2080 },
  { month: "Jun", revenue: 462000, orders: 2510 },
];

export const CATEGORY_SHARE = [
  { name: "Home Decor", value: 32 },
  { name: "Textiles", value: 28 },
  { name: "Festive", value: 18 },
  { name: "Spiritual", value: 12 },
  { name: "Art", value: 10 },
];

export interface Review {
  id: string;
  product: string;
  buyer: string;
  rating: number;
  text: string;
  date: string;
}

export const REVIEWS: Review[] = [
  { id: "r1", product: "Heritage Blue Pottery Vase", buyer: "Aarav M.", rating: 5, text: "Absolutely stunning craftsmanship. Bigger and more beautiful than I expected.", date: "2 days ago" },
  { id: "r2", product: "Festive Diya Set", buyer: "Neha I.", rating: 5, text: "Perfect for Diwali. Loved the rangoli detailing!", date: "4 days ago" },
  { id: "r3", product: "Banarasi Silk Saree", buyer: "Riya K.", rating: 4, text: "Stunning saree. The zari is rich and the fabric flows beautifully.", date: "1 week ago" },
  { id: "r4", product: "Brass Temple Bell", buyer: "Vikram S.", rating: 5, text: "Heavy, well-finished, beautiful tone.", date: "2 weeks ago" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "New order received", body: "Riya Kapoor placed a ₹7,899 order", time: "5m" },
  { id: "n2", title: "AI listing ready", body: "Sandalwood Ganesha — review and publish", time: "1h" },
  { id: "n3", title: "Payout processed", body: "₹42,800 transferred to bank ****8821", time: "3h" },
  { id: "n4", title: "Low stock alert", body: "Madhubani Painting — only 4 left", time: "1d" },
];
