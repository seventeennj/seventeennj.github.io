document.addEventListener('DOMContentLoaded', function() {
  // Array of servers to check (IP:Port)
  const servers = [
    { name: 'Minecraft Modded Server', ip: '68.204.100.3', port: 25565 }, // Use your public IP
    // Add more servers here if needed
  ];

  // Function to check if a server is online
  async function checkServer(ip, port) {
    try {
      const response = await fetch(`http://${ip}:${port}`);
      return response.ok;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }

  // Function to update server status
  function updateStatus(serverElement, status) {
    const statusDot = serverElement.querySelector('.status-dot');
    if (status) {
      statusDot.classList.remove('red');
      statusDot.classList.add('green');
    } else {
      statusDot.classList.remove('green');
      statusDot.classList.add('red');
    }
  }

  // Function to update overall title status dot
  function updateTitleStatus(status) {
    const titleDot = document.getElementById('title-status-dot');
    const statusMessage = document.getElementById('status-message');
    if (status) {
      titleDot.classList.remove('red');
      titleDot.classList.add('green');
      statusMessage.textContent = ''; // Clear the warning message
    } else {
      titleDot.classList.remove('green');
      titleDot.classList.add('red');
      statusMessage.textContent = 'If "server status" is off, game server statuses may not be accurate.'; // Warning message
    }
  }

  // Update all servers
  async function updateAllServers() {
    let allServersOnline = true;
    for (const server of servers) {
      const serverBox = document.querySelector(`[data-server="${server.ip}"]`);
      const status = await checkServer(server.ip, server.port);
      updateStatus(serverBox, status);
      if (!status) {
        allServersOnline = false;
      }
    }
    // Update the title status based on the server status
    updateTitleStatus(allServersOnline);
  }

  // Initial check
  updateAllServers();

  // Refresh every 5 seconds (5 seconds in milliseconds)
  setInterval(updateAllServers, 5000); // 5 seconds
});
