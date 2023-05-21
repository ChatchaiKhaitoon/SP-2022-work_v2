

// Object to store jar amounts
let jars = {
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
  async function updateJars(j){
    const userid = window.sessionStorage.getItem('userid');
    const res = await fetch(`http://localhost:3000/api/update-jars/${userid}`, {
      method: 'PUT',
      headers: {
      'Content-type': 'application/json',
      },
      body: JSON.stringify({jar: j})
    })
    return res.json();
  }
  // Function to add money to a jar
  function addMoney(jar) {
    let amount = Number(prompt(`Enter amount to add to ${jar} jar:`));
    jars[jar] += amount;
    updateJar(jar);
    
    const res = updateJars(jars);
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
    const res = updateJars(jars);
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

  // Update the 9 Jar calculation
const saveBtn = document.getElementById('save-btn');
const jarInputs = document.getElementsByClassName('jar-input');
const resultDiv = document.getElementById('result');

saveBtn.addEventListener('click', () => {
  const jarsData = {};

  for (let i = 0; i < jarInputs.length; i++) {
    const value = parseFloat(jarInputs[i].value) || 0;

    if (value === 0) {
      resultDiv.textContent = 'Please enter values for all jars.';
      return;
    }

    jarsData[`jar${i + 1}`] = value;
  }

  fetch('/api/save-jars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jarsData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resultDiv.textContent = 'Jars data saved successfully.';
    })
    .catch((error) => {
      console.error(error);
      resultDiv.textContent = 'Error occurred while saving jars data.';
    });
});
  
