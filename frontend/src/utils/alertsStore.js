const STORAGE_KEY = "cityshield_alerts";

export const getAlerts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAlerts = (alerts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
};

export const initAlerts = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialAlerts = [
      {
        id: 1,
        title: "🚨 Fire Emergency",
        city: "Mumbai",
        time: "10 mins ago",
        level: "high",
        type: "Fire",
        description:
          "Fire reported in a residential building. Emergency services dispatched.",
        status: "open",
        department: "",
      },
      {
        id: 2,
        title: "⚡ Power Outage",
        city: "Pune",
        time: "30 mins ago",
        level: "medium",
        type: "Power",
        description:
          "Power outage affecting multiple blocks due to transformer issue.",
        status: "open",
        department: "",
      },
      {
        id: 3,
        title: "🚧 Road Blocked",
        city: "Nagpur",
        time: "1 hour ago",
        level: "low",
        type: "Road",
        description:
          "Road blocked due to construction work. Expected clearance soon.",
        status: "open",
        department: "",
      },
    ];

    saveAlerts(initialAlerts);
  }
};
