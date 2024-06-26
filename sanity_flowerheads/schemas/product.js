export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
            options: {
                hotspot: true,
            },
        },
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { 
                source: "name",
                maxLength: 90,
            }
        },
        {
            name: "price",
            title: "Price",
            type: "number"
        },
        {
            name: "details",
            title: "Details",
            type: "string"
        },
        {
            name: "collection",
            title: "Collection",
            type: "string"
        },
        {
            name: "size",
            title: "Size",
            type: "array",
            of: [{ type: "string" }],
            validation: Rule => Rule.required().min(1).max(10)
        }
    ]
}