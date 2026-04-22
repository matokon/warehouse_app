User.find_or_create_by!(email: "demo@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
end

[
  { name: "Shipping Box", unit: "pcs", quantity: 10 },
  { name: "Label Roll", unit: "roll", quantity: 5 },
  { name: "Packing Tape", unit: "pcs", quantity: 20 }
].each do |attrs|
  Item.find_or_create_by!(name: attrs[:name]) do |item|
    item.unit = attrs[:unit]
    item.quantity = attrs[:quantity]
  end
end
