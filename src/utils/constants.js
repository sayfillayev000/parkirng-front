export const formatPrintRow = (key, value, totalLength = 42) => {
  const spacesNeeded =
    totalLength - (String(key).length + String(value).length);

  if (spacesNeeded < 0) {
    return String(key + value).slice(0, totalLength);
  }
  const keyValueFormatted = key + " ".repeat(spacesNeeded) + value;
  return keyValueFormatted;
};

export const printerData = (data) => [
  {
    type: "text",
    align: "center",
    body: JSON.parse(localStorage.getItem("selectedKpp"))?.name,
    font: "large",
  },
  {
    type: "text",
    align: "center",
    body: "Pullik kirish taloni",
    font: "bold",
  },
  {
    type: "text",
    align: "center",
    body: "\n",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow("Hujjat raqami:", data.id),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow("Mashina raqami:", data.plate),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow("Kirish vaqti:", data.enter_date),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow("Chiqish vaqti:", data.exit_date),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow("Hisoblangan vaqt:", `${data.minutes} minut`),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "",
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: formatPrintRow(
      "To'lov miqdori:",
      `${data.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
    ),
    font: "normal",
  },
  {
    type: "text",
    align: "center",
    body: "\n\r",
    font: "normal",
  },
  {
    type: "qrCode",
    align: "center",
    body: String(
      "Id:" +
        data.id +
        "; Avtomobil raqami:" +
        data.plate +
        "; minut:" +
        data.minutes
    ),
    font: "normal",
  },
];

export const printCashierData = (data) => {
  const heading = [
    {
      type: "text",
      align: "center",
      body: JSON.parse(localStorage.getItem("selectedKpp"))?.name,
      font: "large",
    },
    {
      type: "text",
      align: "center",
      body: "Kassirning hisoboti",
      font: "bold",
    },
    {
      type: "text",
      align: "center",
      body: "\n",
      font: "normal",
    },
    {
      type: "text",
      align: "center",
      body: formatPrintRow("Kassir:", data?.name),
      font: "normal",
    },
    {
      type: "text",
      align: "center",
      body: "",
      font: "normal",
    },
    {
      type: "text",
      align: "center",
      body: formatPrintRow("Boshlanish vaqti:", data?.start_date),
      font: "underline",
    },
    {
      type: "text",
      align: "center",
      body: "",
      font: "normal",
    },
    {
      type: "text",
      align: "center",
      body: formatPrintRow("Tugash vaqti:", data?.now_date),
      font: "underline",
    },
    {
      type: "text",
      align: "center",
      body: "",
      font: "normal",
    },
  ];

  const payments =
    data?.payments
      ?.map((payment) => [
        {
          type: "text",
          align: "center",
          body: formatPrintRow(
            payment.type + ":",
            `${payment.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
          ),
          font: "normal",
        },
        {
          type: "text",
          align: "center",
          body: "",
          font: "normal",
        },
      ])
      .flat() || [];

  return [
    ...heading,
    ...payments,
    {
      type: "text",
      align: "center",
      body: formatPrintRow(
        "Jami:",
        `${data.total_sum
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`,
        21
      ),
      font: "bold",
    },
    {
      type: "text",
      align: "center",
      body: "",
      font: "normal",
    },
  ];
};
