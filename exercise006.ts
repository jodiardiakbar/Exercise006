// Soal 1
// student data adalah sebuah object !
interface IStudentData {
  name: string;
  email: string;
  age: Date;
  score: number;
}

interface IScore {
  score: {
    highest: number;
    lowest: number;
    average: number;
  };
  age: {
    highest: number;
    lowest: number;
    average: number;
  };
}

const studentData: IStudentData[] = [
  {
    name: `Budi`,
    email: `budi@gmail.com`,
    age: new Date(`1991-01-01`),
    score: 60,
  },
  {
    name: `Dodi`,
    email: `dodi@gmail.com`,
    age: new Date(`1990-02-03`),
    score: 80,
  },
  {
    name: `Rudi`,
    email: `rudi@gmail.com`,
    age: new Date(`1989-03-04`),
    score: 42,
  },
];

// // cara 1
// function calculateAge(date: Date) {
//   const today = new Date();
//   let age = Math.round(
//     (today.getTime() - date.getTime()) / (3600 * 1000 * 24) / 365
//   );
//   return age;
// }

// cara 2
function calculateAge(date: Date) {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  console.log(diff);
  const age = new Date(diff);
  console.log(age);
  return Math.abs(age.getUTCFullYear() - 1970);
}

function calculateArray(arr: IStudentData[]): IScore {
  const result: IScore = {
    score: {
      highest: 0,
      lowest: 0,
      average: 0,
    },
    age: {
      highest: 0,
      lowest: 0,
      average: 0,
    },
  };

  const scores: number[] = [];
  const ages: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    scores.push(arr[i].score);
    ages.push(calculateAge(arr[i].age));
  }

  console.log(scores);
  console.log(ages);

  result.score.highest = Math.max(...scores);
  result.score.lowest = Math.min(...scores);
  result.score.average =
    scores.reduce((a: number, b: number) => a + b) / arr.length;

  result.age.highest = Math.max(...ages);
  result.age.lowest = Math.min(...ages);
  result.age.average =
    ages.reduce((a: number, b: number) => a + b) / arr.length;

  return result;
}
console.log(calculateArray(studentData));

// Soal 2
// class product dan class transaction tidak berhubungan

interface IProduct {
  name: string;
  price: number;
}

interface ITransaction {
  total: number;
  products: {
    product: IProduct;
    qty: number;
  }[];
}

class Product implements IProduct {
  name;
  price;

  constructor(paramName: string, paramPrice: number) {
    this.name = paramName;
    this.price = paramPrice;
  }
}

class Transaction implements ITransaction {
  #total;
  products: {
    product: IProduct;
    qty: number;
  }[];

  constructor() {
    this.#total = 0;
    this.products = [];
  }

  // gunakan parameter pada method addToCart
  // karena dibutuhkan input dari user: memilih product dan quantitinya
  addToCart(product: IProduct, qty: number) {
    this.#total += product.price * qty;
    this.products.push({
      product,
      qty,
    });
  }

  showTotal() {
    return {
      cart: this.products,
      total: this.#total,
    };
  }

  checkOut() {
    const currProduct: {
      product: IProduct;
      qty: number;
    }[] = [...this.products];
    this.#total = 0;
    this.products = [];
    return currProduct;
  }
}

const newTransaction = new Transaction();
newTransaction.addToCart(new Product(`Kulkas`, 50000), 5);
console.log(newTransaction.showTotal());
newTransaction.addToCart(new Product(`Lemari`, 1000000), 2);
console.log(newTransaction.showTotal());
console.log(newTransaction.checkOut());
