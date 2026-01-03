// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI as string;

// // if (!MONGODB_URI) {
// //   throw new Error("MONGODB_URI is not defined");
// // }

// // let cached = (global as any).mongoose;

// // if (!cached) {
// //   cached = (global as any).mongoose = { conn: null, promise: null };
// // }

// // export async function connectDB() {
// //   if (cached.conn) return cached.conn;

// //   if (!cached.promise) {
// //     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
// //   }

// //   cached.conn = await cached.promise;
// //   return cached.conn;
// // }


























// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// // global cache (for Next.js hot reload)
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;







// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// /* ---------- GLOBAL TYPE DECLARATION ---------- */
// declare global {
//   var mongoose: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   } | undefined;
// }

// /* ---------- GLOBAL CACHE ---------- */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// /* ---------- CONNECT FUNCTION ---------- */
// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;








import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/* ---------- TYPE FOR CACHE ---------- */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/* ---------- GLOBAL DECLARATION ---------- */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/* ---------- INITIALIZE CACHE ---------- */
const cached: MongooseCache =
  global.mongoose ?? (global.mongoose = { conn: null, promise: null });

/* ---------- CONNECT FUNCTION ---------- */
async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

