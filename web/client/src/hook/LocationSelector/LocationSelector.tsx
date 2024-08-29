import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./locationSelector.css";

interface LocationSelectorProps {
  setFieldValue: (field: string, value: any) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  setFieldValue,
}) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch provinces on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://esgoo.net/api-tinhthanh/4/0.htm")
      .then((response) => {
        setProvinces(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        setError("Failed to load provinces");
        setLoading(false);
      });
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      const selectedProvinceData = provinces.find(
        (p) => p.id === selectedProvince
      );
      if (selectedProvinceData) {
        setDistricts(selectedProvinceData.data2 || []);
        setWards([]);
        setFieldValue("state", selectedProvinceData.full_name);
        setLoading(false);
      } else {
        setDistricts([]);
        setWards([]);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince, provinces, setFieldValue]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      const selectedProvinceData = provinces.find(
        (p) => p.id === selectedProvince
      );
      const selectedDistrictData = selectedProvinceData?.data2.find(
        (d) => d.id === selectedDistrict
      );
      if (selectedDistrictData && selectedDistrictData.data3) {
        setWards(selectedDistrictData.data3);
        setFieldValue("city", selectedDistrictData.full_name);
        setLoading(false);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  }, [selectedDistrict, selectedProvince, provinces, setFieldValue]);

  // Memoize address construction
  const address = useMemo(() => {
    const province = provinces.find((p) => p.id === selectedProvince);
    const district = province?.data2.find((d) => d.id === selectedDistrict);
    const ward = district?.data3.find((w) => w.id === selectedWard);
    return `${province?.full_name || ""}, ${district?.full_name ||
      ""}, ${ward?.full_name || ""}`;
  }, [selectedProvince, selectedDistrict, selectedWard, provinces]);

  // Update the address on change
  useEffect(() => {
    setFieldValue("address", address);
  }, [address, setFieldValue]);

  // Handle location change
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: "province" | "district" | "ward"
  ) => {
    const value = event.target.value;
    switch (type) {
      case "province":
        setSelectedProvince(value);
        setSelectedDistrict(""); // Reset district and ward when province changes
        setSelectedWard("");
        break;
      case "district":
        setSelectedDistrict(value);
        setSelectedWard(""); // Reset ward when district changes
        break;
      case "ward":
        setSelectedWard(value);
        break;
    }
  };

  return (
    <div className='location-selector'>
      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      <label htmlFor='province-select'>Tỉnh/Thành phố</label>
      <select
        id='province-select'
        className='select-location'
        onChange={(e) => handleLocationChange(e, "province")}
        value={selectedProvince}
      >
        <option value=''>Chọn tỉnh/thành phố</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.full_name}
          </option>
        ))}
      </select>

      <label htmlFor='district-select'>Quận/Huyện</label>
      <select
        id='district-select'
        className='select-location'
        onChange={(e) => handleLocationChange(e, "district")}
        value={selectedDistrict}
        disabled={!selectedProvince}
      >
        <option value=''>Chọn quận/huyện</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.full_name}
          </option>
        ))}
      </select>

      <label htmlFor='ward-select'>Phường/Xã</label>
      <select
        id='ward-select'
        className='select-location'
        onChange={(e) => handleLocationChange(e, "ward")}
        value={selectedWard}
        disabled={!selectedDistrict}
      >
        <option value=''>Chọn phường/xã</option>
        {wards.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
