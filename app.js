// 🔗 CONNECT SUPABASE
const supabaseUrl = "YOUR_PROJECT_URL";
const supabaseKey = "YOUR_ANON_KEY";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 🔐 SIGNUP
async function signup(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  console.log(data, error);
}

// 💾 SAVE USER DATA
async function saveUser(name, role) {
  const user = await supabaseClient.auth.getUser();

  await supabaseClient.from("users").insert([
    {
      id: user.data.user.id,
      name: name,
      role: role,
    },
  ]);
}

// 🔑 LOGIN
async function login(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data, error);
}

// 🌾 ADD PRODUCT
async function addProduct(name, price, quantity) {
  const user = await supabaseClient.auth.getUser();

  const { data, error } = await supabaseClient
    .from("products")
    .insert([
      {
        name,
        price,
        quantity,
        farmer_id: user.data.user.id,
      },
    ]);

  console.log(data, error);
}

// 📦 LOAD PRODUCTS
async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*");

  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div>
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Qty: ${product.quantity}</p>
      </div>
    `;
  });
}
