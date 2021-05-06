-- purpose: search images by search terms
USE shopify;

-- SELECT id FROM search_term 
-- WHERE term='apple';

-- SELECT image_id, search_term_id FROM images_search_terms as ist JOIN search_term as st
-- ON ist.search_term_id=st.id
-- WHERE st.term='apple';

-- SELECT image_id, search_term_id, author_id FROM images_search_terms as ist JOIN search_term as st JOIN image as i
-- ON ist.search_term_id=st.id AND ist.image_id=i.id
-- WHERE st.term='apple';

-- SELECT image_id FROM images_search_terms as ist JOIN search_term as st 
-- ON ist.search_term_id=st.id 
-- WHERE st.term='banana'; 

-- SELECT image_id FROM images_search_terms as ist JOIN search_term as st 
-- ON ist.search_term_id=st.id 
-- WHERE st.term IN ('apple', 'carrot'); 

-- SELECT image_id, author_id, datetime_upload, public, uri FROM images_search_terms as ist JOIN search_term as st JOIN image as i
-- ON ist.search_term_id=st.id AND ist.image_id=i.id
-- WHERE st.term IN ('apple', 'carrot'); 

SELECT image_id, author_id, first_name, datetime_upload, public, uri FROM images_search_terms as ist JOIN search_term as st JOIN image as i JOIN user as u
ON ist.search_term_id=st.id AND ist.image_id=i.id AND i.author_id=u.id
WHERE st.term IN ('apple', 'carrot'); 
-- replace with parameterized search terms with string interpolation at web server
