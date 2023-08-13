const router = require("express").Router();
const db = require("../db");
const upload = require("../multer-config");
const carimages = {
  "Toyota": {
    "Camry":
      "https://www.autotrader.com/wp-content/uploads/2022/02/2021-toyota-camry-trd.jpg?w=1024",
    "Corolla":
      "https://d39q3bqe976bgd.cloudfront.net/wp-content/uploads/2018/10/11190520/toyota-2019-corolla-exterior-blue-crush-metallic-l.jpg",
  },
  'BMW': {
    'X1': "https://images.hgmsites.net/hug/2023-bmw-ix1_100843318_h.jpg",
  },
  "Honda": {
    "Civic":
      "https://uploads.builtforbackroads.com/uploads/2022/02/2022.02.07-HONDA-CIVIC-2019_1.jpg",
  },
  "Ford": {
    "Fusion":
      "https://storage.googleapis.com/wackk-images-production-4f204ab/tamt9q2j59vs319sckif2yxgi4ra",
  },
  "Chevrolet": {
    "Malibu":
      "https://www.autotrader.com/wp-content/uploads/2022/03/2019-chevrolet-malibu-lt.jpg",
  },
};

// Sell Your Car Route - Add a New Car for Sale
router.post("/", upload.single("images"), async (req, res) => {
  console.log("backend received request");
  try {
    const {
      car_make,
      car_model,
      mileage,
      price,
      year,
      color,
      images,
      car_luxury,
    } = req.body;
console.log(carimages, car_make, car_model);
console.log(carimages["BMW"])
    // const imageFilename = carimages[car_make][car_model];
    const imageFilename = carimages["BMW"]["X1"];


    // Check if required fields are provided
    if (!car_make || !car_model || !price || !color || !year) {
      return res.status(400).json({ message: "Incomplete Form" });
    }

    // Insert the new car listing into the database
    const { rows } = await db.query(
      `INSERT INTO car_listings (car_make, car_model, mileage, price, year, color, images, visibility, car_luxury)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        car_make,
        car_model,
        parseInt(mileage),
        parseInt(price),
        parseInt(year),
        color,
        [imageFilename],
        true,
        car_luxury,
      ]
    );
    const car = rows[0];
    // Send success response
    return res
      .status(200)
      .json({ message: "Car added for sale successfully", car });
  } catch (error) {
    console.error("Error adding car for sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:car_id", async (req, res) => {
  const car_id = req.params.car_id;

  try {
    const { mileage, price, year } = req.body;

    // Check if required fields are provided
    if (!mileage || !price || !year) {
      return res.status(400).json({ message: "Incomplete Form" });
    }

    // Insert the new car listing into the database
    const { rows } = await db.query(
      `UPDATE car_listings set mileage=$1, price=$2, year=$3
       WHERE id = $4 RETURNING *`,
      [mileage, price, year, car_id]
    );

    const car = rows[0];
    // Send success response
    return res.status(200).json({ message: "Updated Successfully", car });
  } catch (error) {
    console.error("Error adding car for sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
