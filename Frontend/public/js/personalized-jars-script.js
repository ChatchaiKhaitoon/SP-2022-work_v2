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
  
  // Function to add money to a jar
  function addMoney(jar) {
    const amount = Number(prompt(`Enter amount to add to ${jar} jar:`));
    jars[jar] += amount;
    updateJar(jar);
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
  
