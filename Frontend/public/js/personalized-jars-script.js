// Object to store jar amounts
const jars = {
    necessity: 0,
    education: 0,
    play: 0,
    giving: 0,
    emergency: 0,
    retirement: 0,
    insurance: 0,
    freedom: 0,
    debt: 0,
  };
  async function putJars(amount){
    const res = await fetch('http://localhost:3000/api/update-jars/u001', {
      method: 'PUT',
      headers: {
      'Content-type': 'application/json',
      },
      body: JSON.stringify({amount: amount})
    })
    return res.json();
  }
  // Function to add money to a jar
  function addMoney(jar) {
    const amount = Number(prompt(`Enter amount to add to ${jar} jar:`));
    jars[jar] += amount;
    updateJar(jar);
    
    const res = putJars(Number(amount));
    res.then(res => {
      console.log(res);
    }).catch(err =>{
      console.log(err);
    })
  }
  
  // Function to reduce money from a jar
  function reduceMoney(jar) {
    const amount = Number(prompt(`Enter amount to reduce from ${jar} jar:`));
    if (amount > jars[jar]) {
      alert(`Not enough funds in ${jar} jar!`);
      return;
    }
    jars[jar] -= amount;
    updateJar(jar);
    const res = putJars(Number(-amount));
    res.then(res => {
      console.log(res);
    }).catch(err =>{
      console.log(err);
    })
  }
  
  // Function to transfer money from one jar to another
  function transferMoney(jar) {
    const amount = Number(prompt(`Enter amount to transfer from ${jar} jar:`));
    if (amount > jars[jar]) {
      alert(`Not enough funds in ${jar} jar!`);
      return;
    }
    const toJar = prompt(`Enter name of jar to transfer ${amount} to:`);
    if (!jars.hasOwnProperty(toJar)) {
      alert(`Invalid jar name: ${toJar}`);
      return;
    }
    jars[jar] -= amount;
    jars[toJar] += amount;
    updateJar(jar);
    updateJar(toJar);
  }
  
  // Function to update the jar display
  function updateJar(jar) {
    document.getElementById(jar).value = jars[jar];
  }
  
