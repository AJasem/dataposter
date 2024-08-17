const start = document.getElementById("btn");

start.addEventListener("click", async () => {
  const resultDiv = document.getElementById("res");
  resultDiv.innerHTML = `<p>Loading...</p>`;
  try {
    const response = await fetch("http://localhost:3000/flag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const resultDiv = document.getElementById("res");
    resultDiv.innerHTML = `<p>${JSON.stringify(data)}</p>`;
  } catch (error) {
    console.error("Error:", error);
    const resultDiv = document.getElementById("res");
    resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});
