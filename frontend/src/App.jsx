import React, { useState } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Button,
  VStack,
  Select,
  Text,
  Heading,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('');
  const [loading,setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true)
    axios.post(`https://code-converter-server.onrender.com/convert`, { code, language })
      .then((res) => {
        console.log(res.data);
        setLoading(false)
        setOutput(res.data.converted);
      });
  };

  const handleDebug = async () => {
    setLoading(true)
    axios.post(`https://code-converter-server.onrender.com/debug`, { code })
      .then((res) => {
        console.log(res.data.errors);
        if (res.data.errors) {
          let errorMessage = '';
          for (let i = 0; i < res.data.errors.length; i++) {
            errorMessage += res.data.errors[i] + '\n';
          }
          console.log(errorMessage);
          setLoading(false)
          setOutput(errorMessage);
        } else {
          let message = '';
          message += res.data.message + '\n' + res.data.functionality;
          setLoading(false)
          setOutput(message);
        }
      });
  };

  const handleQualityCheck = async () => {
    setLoading(true)
    axios.post(`https://code-converter-server.onrender.com/qualitycheck`, { code })
      .then((res) => {
        console.log(res.data);
        setLoading(false)
        setOutput(res.data);
      });
  };

  return (
    <>
      <Center m="10px" mb={'0px'}>
        <Heading size="lg" color="#3750B5">
          Code Wizard
        </Heading>
      </Center>
      <Center m={'15px'} mt={'0px'}>
        <Text fontSize="md" color="#667FCC" textDecoration={'underline'}>
        Empower Your Code with Conversion, Debugging, and Quality Checking
        </Text>
      </Center>
      <Flex direction={['column', 'row']} minH="100vh" bg="#f8f8f8">
        <Box flex="1" p={8} bg="#2d3748" color="white">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here"
            rows={10}
            resize="none"
            bg="#2d3748"
            color="white"
            border="2px solid white"
            outline="none"
            fontSize="md"
          />
        </Box>
        <Box p={8} borderWidth={1} borderRadius="md" w={['100%','50%']} bg="white">
          <VStack spacing={4} align="stretch">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Select language"
              bg="white"
              border="1px solid #cbd5e0"
              borderRadius="md"
              px={2}
              py={1}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              {/* Add more language options as needed */}
            </Select>
            <Flex>
              <Button
                flex="1"
                colorScheme="blue"
                onClick={handleConvert}
                mr={2}
                _hover={{ bg: 'blue.500' }}
              >
                Convert
              </Button>
              <Button
                flex="1"
                colorScheme="blue"
                onClick={handleDebug}
                mr={2}
                _hover={{ bg: 'blue.500' }}
              >
                Debug
              </Button>
              <Button
                flex="1"
                colorScheme="blue"
                onClick={handleQualityCheck}
                _hover={{ bg: 'blue.500' }}
              >
                Quality Check
              </Button>
            </Flex>
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              Output:
            </Text>
            <Textarea
              value={loading?"Loading....":output}
              isReadOnly
              rows={10}
              placeholder="Output"
              bg="#f8f8f8"
              border="1px solid #cbd5e0"
              borderRadius="md"
              px={2}
              py={1}
              fontSize="md"
            />
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

export default App;