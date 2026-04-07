demo_user = User.find_or_create_by!(email: "demo@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
end

items = [
  { sku: "SKU-001", name: "Shipping Box", unit: "pcs" },
  { sku: "SKU-002", name: "Label Roll", unit: "roll" },
  { sku: "SKU-003", name: "Packing Tape", unit: "pcs" }
]

items.each do |attrs|
  Item.find_or_create_by!(sku: attrs[:sku]) do |item|
    item.name = attrs[:name]
    item.unit = attrs[:unit]
  end
end

if StockMovement.count.zero?
  Item.all.each do |item|
    StockMovements::Create.new(
      item: item,
      user: demo_user,
      movement_type: :receipt,
      quantity: 10,
      reference: "seed"
    ).call
  end
end
