// pseudo code:

// URL: localhost:8080/searchImagesByText
query = build_sql_query(search_terms)
return images_authors_presentation_data = query1(query)

// URL: localhost:8080/searchImagesByImages
search_terms = set(gcp_object_detection(img)) + set(gcp_logo_detection(img))
query = build_sql_query(search_terms)
return images_authors_presentation_data = query1(query)

