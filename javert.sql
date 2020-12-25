--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2020-12-25 09:05:00 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16395)
-- Name: hosts; Type: TABLE; Schema: public; Owner: ecommerce
--

CREATE TABLE public.hosts (
    id bigint NOT NULL,
    name character varying(80) NOT NULL,
    url character varying(20) NOT NULL,
    file_sys character varying(10) NOT NULL,
    description character varying(500),
    active boolean DEFAULT true,
    created_at timestamp without time zone
);


ALTER TABLE public.hosts OWNER TO ecommerce;

--
-- TOC entry 203 (class 1259 OID 16407)
-- Name: hosts_id_seq; Type: SEQUENCE; Schema: public; Owner: ecommerce
--

ALTER TABLE public.hosts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hosts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3964 (class 0 OID 16395)
-- Dependencies: 202
-- Data for Name: hosts; Type: TABLE DATA; Schema: public; Owner: ecommerce
--

COPY public.hosts (id, name, url, file_sys, description, active, created_at) FROM stdin;
1	Suse Weed	198.23.45.23	btrfs	\N	t	2020-12-25 09:00:44.882746
\.


--
-- TOC entry 3971 (class 0 OID 0)
-- Dependencies: 203
-- Name: hosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecommerce
--

SELECT pg_catalog.setval('public.hosts_id_seq', 2, true);


--
-- TOC entry 3833 (class 2606 OID 16402)
-- Name: hosts hosts_pkey; Type: CONSTRAINT; Schema: public; Owner: ecommerce
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_pkey PRIMARY KEY (id);


--
-- TOC entry 3835 (class 2606 OID 16406)
-- Name: hosts uniq_host; Type: CONSTRAINT; Schema: public; Owner: ecommerce
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT uniq_host UNIQUE (name);


--
-- TOC entry 3837 (class 2606 OID 16404)
-- Name: hosts uniq_url; Type: CONSTRAINT; Schema: public; Owner: ecommerce
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT uniq_url UNIQUE (url);


-- Completed on 2020-12-25 09:05:01 EET

--
-- PostgreSQL database dump complete
--

