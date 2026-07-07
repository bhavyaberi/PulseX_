
const BASE_URL = "http://localhost:5000/api";

const runTests = async () => {
  console.log("=== STARTING PULSEX DATABASE INTEGRATION TESTS ===\n");
  
  const emailA = `test_user_a_${Date.now()}@test.com`;
  const emailB = `test_user_b_${Date.now()}@test.com`;
  const passwordA = "password123";
  const passwordB = "password456";

  try {
    // Test 1: Register User A
    console.log(`[Test 1] Registering User A (${emailA})...`);
    const regResA = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User A", email: emailA, password: passwordA })
    });
    const regDataA = await regResA.json();
    if (regResA.ok) {
      console.log(`✅ User A registered successfully! Token: ${regDataA.data.token.slice(0, 15)}...`);
    } else {
      throw new Error(`❌ Failed to register User A: ${regDataA.message}`);
    }

    // Test 2: Enforce Unique Email (Register User A again)
    console.log(`\n[Test 2] Trying to register User A (${emailA}) again to test unique constraint...`);
    const regDupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User A Duplicate", email: emailA, password: passwordA })
    });
    const regDupData = await regDupRes.json();
    if (!regDupRes.ok) {
      console.log(`✅ Success: Duplicate registration rejected with error message: "${regDupData.message}"`);
    } else {
      throw new Error("❌ Error: Duplicate email registration was incorrectly allowed!");
    }

    // Test 3: Reject Wrong Password Login
    console.log(`\n[Test 3] Attempting login for User A with wrong password...`);
    const loginFailRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailA, password: "wrongpassword" })
    });
    const loginFailData = await loginFailRes.json();
    if (loginFailRes.status === 401 || !loginFailRes.ok) {
      console.log(`✅ Success: Wrong password rejected with error: "${loginFailData.message}"`);
    } else {
      throw new Error("❌ Error: Login was incorrectly permitted with a wrong password!");
    }

    // Test 4: Successful Login
    console.log(`\n[Test 4] Logging in User A with correct password...`);
    const loginResA = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailA, password: passwordA })
    });
    const loginDataA = await loginResA.json();
    if (loginResA.ok) {
      console.log(`✅ Login successful! Greeting: Welcome back, ${loginDataA.data.name}.`);
    } else {
      throw new Error(`❌ Failed to login: ${loginDataA.message}`);
    }
    const tokenA = loginDataA.data.token;

    // Test 5: Profile Data Storage & Preservation (User A)
    console.log(`\n[Test 5] Updating biometric profile for User A...`);
    const updateResA = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        height: 182,
        weight: 85.4,
        targetWeight: 80.0,
        fitnessLevel: "Advanced",
        workoutFrequency: 5
      })
    });
    const updateDataA = await updateResA.json();
    if (updateResA.ok) {
      console.log(`✅ User A profile updated successfully! Saved BMI: ${updateDataA.data.bmi}`);
    } else {
      throw new Error(`❌ Profile update failed: ${updateDataA.message}`);
    }

    // Retrieve and verify data for User A
    console.log(`Retrieving User A profile details to verify saved data...`);
    const getProfileResA = await fetch(`${BASE_URL}/user/profile`, {
      headers: { "Authorization": `Bearer ${tokenA}` }
    });
    const getProfileDataA = await getProfileResA.json();
    if (getProfileResA.ok && getProfileDataA.data.height === 182 && getProfileDataA.data.weight === 85.4) {
      console.log(`✅ Success: Retracted profile values matches input: Height=${getProfileDataA.data.height}cm, Weight=${getProfileDataA.data.weight}kg`);
    } else {
      throw new Error(`❌ Retracted values do not match! Received: ${JSON.stringify(getProfileDataA.data)}`);
    }

    // Test 6: Isolation & Independent Storage (User B)
    console.log(`\n[Test 6] Registering User B (${emailB}) to verify data isolation...`);
    const regResB = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User B", email: emailB, password: passwordB })
    });
    const regDataB = await regResB.json();
    if (regResB.ok) {
      console.log(`✅ User B registered successfully!`);
    } else {
      throw new Error(`❌ Failed to register User B: ${regDataB.message}`);
    }
    const tokenB = regDataB.data.token;

    console.log(`Retrieving User B profile details...`);
    const getProfileResB = await fetch(`${BASE_URL}/user/profile`, {
      headers: { "Authorization": `Bearer ${tokenB}` }
    });
    const getProfileDataB = await getProfileResB.json();
    
    if (getProfileDataB.data.height !== 182 && getProfileDataB.data.weight !== 85.4) {
      console.log(`✅ Success: User B's profile is empty/default (Height=${getProfileDataB.data.height}, Weight=${getProfileDataB.data.weight}), completely isolated from User A!`);
    } else {
      throw new Error("❌ Error: Cross-talk/Leak detected! User B is seeing User A's private biometric data.");
    }

    console.log("\n=================================================");
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉");
    console.log("Enforced unique email validation constraint.");
    console.log("Enforced authentication credentials matching.");
    console.log("Confirmed separate, multi-tenant profile storage.");
    console.log("=================================================\n");

  } catch (error) {
    console.error(`\n❌ TEST FAULT DETECTED: ${error.message}\n`);
  }
};

runTests();
