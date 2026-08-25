import Fintoc from "fintoc"

const fintocClient = new Fintoc(process.env.FINTOC_API_KEY || "sk_test_12345")

export default fintocClient
