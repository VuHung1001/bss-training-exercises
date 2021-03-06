// initial dashboard table data
let data = [
  {
    device: "TV",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-30",
    power: 50,
  },
  {
    device: "Washing Machine",
    macAddress: "00:1B:44:11:3A:B8",
    ip: "127.0.0.3",
    createdDate: "2021-05-31",
    power: 100,
  },
  {
    device: "Refrigerator",
    macAddress: "00:1B:44:11:3A:B9",
    ip: "127.0.0.4",
    createdDate: "2021-06-01",
    power: 90,
  },
  {
    device: "Fan",
    macAddress: "00:1B:44:11:3A:A1",
    ip: "127.0.0.5",
    createdDate: "2021-06-02",
    power: 40,
  },
  {
    device: "Laptop",
    macAddress: "00:1B:44:11:3A:A2",
    ip: "127.0.0.6",
    createdDate: "2021-05-29",
    power: 30,
  },
  {
    device: "PC",
    macAddress: "00:1B:44:11:3A:A3",
    ip: "127.0.0.7",
    createdDate: "2021-06-03",
    power: 60,
  },
];

// get devices data from local storage
let stored = JSON.parse(localStorage.getItem("devices"));

// if devices data from local storage are not available, initialize them
if (!stored) {
  localStorage.setItem("devices", JSON.stringify(data));
  stored = JSON.parse(localStorage.getItem("devices"));
}