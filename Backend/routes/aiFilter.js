import express from "express";

const router = express.Router();

/* 🧠 SMART FILTER EXTRACTOR */
const extractFilters = (text) => {
  const t = text.toLowerCase();

  /* ---------------- CATEGORY ---------------- */
  let category = null;

  if (/(women|woman|female|ladies|girl)/.test(t)) {
    category = "Women";
  } else if (/(men|male|gents|boy)/.test(t)) {
    category = "Men";
  } else if (/(kids|kid|children|baby)/.test(t)) {
    category = "Kids";
  } else if (/(skin|skincare|face care|beauty)/.test(t)) {
    category = "SkinCare"; // ✅ KEEP SAME AS FRONTEND
  } else if (/(accessories|jewellery|jewelry|bags|watch|belt)/.test(t)) {
    category = "Accessories";
  }

  /* ---------------- SUBCATEGORY ---------------- */
  let subCategory = null;

  // CLOTHING
  if (/(top|tshirt|t-shirt|shirt|crop|blouse)/.test(t)) {
    subCategory = "TopWear";
  } 
  else if (/(jeans|pant|pants|trouser|bottom|leggings)/.test(t)) {
    subCategory = "BottomWear";
  } 
  else if (/(jacket|hoodie|sweater|coat)/.test(t)) {
    subCategory = "WinterWear";
  } 
  else if (/(kurta|saree|lehenga|ethnic)/.test(t)) {
    subCategory = "Ethnic Wear";
  }

  // ACCESSORIES
  else if (/(jewellery|jewelry|necklace|earring|ring)/.test(t)) {
    subCategory = "Jewellery";
  } 
  else if (/(bag|handbag|backpack)/.test(t)) {
    subCategory = "Bags";
  } 
  else if (/(watch)/.test(t)) {
    subCategory = "Watches";
  } 
  else if (/(belt)/.test(t)) {
    subCategory = "Belts";
  }

  // SKINCARE
  else if (/(face wash|cleanser|face care)/.test(t)) {
    subCategory = "Face Care";
  } 
  else if (/(serum)/.test(t)) {
    subCategory = "Serum";
  } 
  else if (/(lotion|body lotion)/.test(t)) {
    subCategory = "Body Lotion";
  } 
  else if (/(shampoo|conditioner|hair)/.test(t)) {
    subCategory = "Hair Care";
  }

  /* ---------------- COLOR ---------------- */
  let color = null;
  const colors = ["black", "white", "red", "blue", "green", "yellow", "pink", "brown"];

  for (let c of colors) {
    if (t.includes(c)) {
      color = c;
      break;
    }
  }

  /* ---------------- PRICE ---------------- */
  let maxPrice = null;
  let minPrice = null;

  const underMatch = t.match(/under (\d+)/);
  if (underMatch) {
    maxPrice = Number(underMatch[1]);
  }

  const betweenMatch = t.match(/between (\d+) and (\d+)/);
  if (betweenMatch) {
    minPrice = Number(betweenMatch[1]);
    maxPrice = Number(betweenMatch[2]);
  }

  /* ---------------- BEST SELLER ---------------- */
  let bestSeller = null;
  if (/(best seller|bestseller|top selling)/.test(t)) {
    bestSeller = true;
  }

  /* ---------------- SIZE ---------------- */
  let size = null;
  const sizes = ["s", "m", "l", "xl", "xxl"];

  for (let s of sizes) {
    if (t.includes(`size ${s}`)) {
      size = s.toUpperCase();
    }
  }

  return {
    category,
    subCategory,
    maxPrice,
    minPrice,
    bestSeller,
    size,
    color,
    searchQuery: text,
    spokenReply: "Here are the best matching products",
  };
};

/* 🎯 ROUTE */
router.post("/parse-filter", (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: "No transcript" });
  }

  try {
    const filters = extractFilters(transcript);
    console.log("Filters:", filters);
    res.json(filters);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Parsing failed",
    });
  }
});

export default router;